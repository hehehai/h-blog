import type { Register } from "@tanstack/react-router";
import {
  createSsrStreamResponse,
  defineHandlerCallback,
  getSsrStatus,
  transformReadableStreamWithRouter,
  waitForRequest,
} from "@tanstack/react-router/ssr/server";
import {
  createStartHandler,
  type RequestHandler,
  StartServer,
} from "@tanstack/react-start/server";
import { renderToReadableStream } from "react-dom/server";

const HTML_RENDER_TIMEOUT_MS = 30_000;

const renderCompleteHtml = defineHandlerCallback(
  async ({ request, router, responseHeaders }) => {
    const signal = AbortSignal.any([
      request.signal,
      AbortSignal.timeout(HTML_RENDER_TIMEOUT_MS),
    ]);

    try {
      signal.throwIfAborted();
      const stream = await renderToReadableStream(
        <StartServer router={router} />,
        {
          nonce: router.options.ssr?.nonce,
          progressiveChunkSize: Number.POSITIVE_INFINITY,
          signal,
        }
      );

      // Do not let a reader flush pending Suspense fallbacks into static HTML.
      // These small blog pages favor immediately readable article bodies over
      // progressive HTML delivery; client-side MDX splitting stays unchanged.
      await waitForRequest(stream.allReady, signal);
      signal.throwIfAborted();

      const body = transformReadableStreamWithRouter(router, stream, {
        rendererSafePoint: "script-close",
        signal,
      });
      return createSsrStreamResponse(
        router,
        new Response(body, {
          headers: responseHeaders,
          status: getSsrStatus(router),
        })
      );
    } catch (error) {
      router.serverSsr?.cleanup();
      throw error;
    }
  }
);

export default {
  fetch: createStartHandler(renderCompleteHtml),
} satisfies { fetch: RequestHandler<Register> };
