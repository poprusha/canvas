export type NodeCreatorList = {
  board: HTMLCanvasElement;
  wrapper: HTMLCanvasElement;
};

export class NodeCreator {
  public static create(root: string): NodeCreatorList {
    const nodeElements = {
      board: document.createElement('canvas'),
      wrapper: document.createElement('canvas'),
    };

    const rootElement = NodeCreator.loadRootBySelector(root) ?? NodeCreator.createRootNode(root);

    Object.keys(nodeElements).forEach((key) => {
      nodeElements[key].id = key;
      rootElement.appendChild(nodeElements[key]);
    });

    return nodeElements;
  }

  private static loadRootBySelector(selector: string): Element | null {
    return document.querySelector(selector);
  }

  private static createRootNode(selector: string): Element {
    const rootElement = document.createElement('div');

    const indicator = selector.substring(1);

    if (selector.startsWith('#')) {
      rootElement.id = indicator;
    } else {
      rootElement.classList.add(indicator);
    }

    document.body.appendChild(rootElement);

    return rootElement;
  }
}
