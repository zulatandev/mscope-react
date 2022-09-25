export class StorageService {
  static setItem(key: string, data: any) {
    if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  }

  static getItem(key: string, defaultValue: any = null) {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    return item;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
