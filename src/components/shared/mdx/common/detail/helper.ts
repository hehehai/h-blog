import {
  Children,
  type Key,
  type ReactElement,
  type ReactNode,
  cloneElement,
} from 'react';
import { Details } from './detail';
import { Summary } from './summary';

export const findSummary = (children: ReactNode): [ReactNode, ReactNode[]] => {
  let summary: ReactNode = null;
  const restChildren: ReactNode[] = [];

  Children.forEach(children, (child, index) => {
    if (child && (child as ReactElement).type === Summary) {
      summary ||= child;
      return;
    }

    let c: ReactNode = child;
    if (
      !summary &&
      child &&
      typeof child === 'object' &&
      'type' in child &&
      (child as ReactElement).type !== Details &&
      'props' in child &&
      child.props
    ) {
      const result = findSummary(
        (child.props as { children: ReactNode }).children
      );
      summary = result[0];
      c = cloneElement(child as ReactElement<{ children: ReactNode }>, {
        ...child.props,
        children: result[1]?.length ? result[1] : undefined,
        key: index as Key,
      });
    }
    restChildren.push(c);
  });

  return [summary, restChildren];
};
