export function LocalStorageMock() {
  let m: Record<string, any> = {};
  return {
    getItem: (key: string) => m[key],
    setItem: (key: string, value: string) => (m[key] = value),
    removeItem: (key: string) => delete m[key],
    clear: () => (m = {}),
    length: 0,
    key: (index: number) => Object.keys(m)[index],
  };
}
