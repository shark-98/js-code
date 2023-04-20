import { getValue } from "./index";

describe('递归获取对象属性', () => {
  it('test', () => {
    const user = {
      info: {
        name: "张三",
        address: { home: "Shaanxi", company: "Xian" },
      },
    };

    const getValueUseKey = (key: string, defaultValue = '') => {
      return getValue(user, key, defaultValue)
    }

    expect(getValueUseKey("info.name")).toBe('张三')
    expect(getValueUseKey("info.address.home")).toBe('Shaanxi');
    expect(getValueUseKey("info.address.company")).toBe('Xian');
    expect(getValueUseKey("info.address.abc", "fallback")).toBe('fallback');
  })
})
