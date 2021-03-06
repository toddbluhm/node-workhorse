import deepDots from './deep-dots';
import WorkloadHrefMeta from '../models/workload-href-meta';

let _loadClass = (modulePath, className) => {
  let oClass = require(modulePath);
  if (!oClass) {
    throw new Error(`Could not find module ${modulePath}`);
  }
  if (className) {
    oClass = deepDots(oClass, className);
    if (!oClass) {
      throw new Error(`Could not find class ${className} in module ${modulePath}`);
    }
  }
  return oClass;
};

export function instantiate(oClass: any): any {
  if (!oClass.prototype) {
    oClass = oClass.default;
  }
  if (!oClass.prototype) {
    return null;
  }
  return new oClass();
}

export function instantiateFromPath(href: string): any {
  let meta = WorkloadHrefMeta.parse(href);
  let oClass = _loadClass(meta.modulePath, meta.className);
  let instance = instantiate(oClass);
  if (!instance) {
    throw new Error(`Expected ${href} to have a prototype`);
  }
  return instance;
}
