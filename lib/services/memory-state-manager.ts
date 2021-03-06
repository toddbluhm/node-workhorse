import Work from '../models/work';
import IStateManager from '../interfaces/state-manager';
import Workhorse from '../workhorse';

export default class MemoryStateManager implements IStateManager {
  workhorse: Workhorse;
  stateMap: any;
  private nextID: number;

  constructor() {
    this.nextID = 1;
    this.stateMap = {};
  }

  save (work: Work): Promise<any> {
    if (!work.id) {
      work.id = (this.nextID++).toString();
    }
    if (!work.created) {
      work.created = new Date();
    }
    work.updated = new Date();
    this.stateMap[work.id] = work;
    return Promise.resolve(null);
  }

  saveAll (work: Work[]): Promise<any> {
    let promises = work.map((row) => {
      return this.save(row);
    });
    return Promise.all(promises)
    .then(() => {
      return null;
    });
  }

  saveWorkStarted(work: Work): Promise<any> {
    return this.save(work);
  }

  saveWorkEnded(work: Work): Promise<any> {
    return this.save(work);
  }

  saveFinalizerStarted(work: Work): Promise<any> {
    return this.save(work);
  }

  saveFinalizerEnded(work: Work): Promise<any> {
    return this.save(work);
  }

  saveCreatedChildren(work: Work): Promise<any> {
    return this.save(work);
  }

  load (id: string): Promise<Work> {
    let work = this.stateMap[id];
    return Promise.resolve(work);
  }

  loadAll (ids: string[]): Promise<Work[]> {
    let promises = ids.map((row) => {
      return this.load(row);
    });
    return Promise.all(promises);
  }

  childWorkFinished(work: Work, parent: Work): Promise<boolean> {
    parent.finishedChildrenIDs.push(work.id);
    let isDone = parent.finishedChildrenIDs.length === parent.childrenIDs.length;
    return this.save(parent)
    .then(() => {
      return isDone;
    });
  }
}
