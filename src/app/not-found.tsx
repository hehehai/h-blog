import { Link } from 'next-view-transitions';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-base text-gray-900">404</p>
        <h1 className="mt-4 font-bold text-3xl text-gray-900 tracking-tight sm:text-5xl">
          未找到页面
        </h1>
        <p className="mt-6 text-base text-gray-600 leading-7">
          抱歉!我们找不到您要查找的页面
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
