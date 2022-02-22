//自动化测试使用，
//这些api，查看官网：https://jestjs.io/docs/expect#tobedefined
test('test common', ()=>{
  expect(2+2).toBe(4);
  expect(2+2).not.toBe(5);
})

test('test boolean', ()=> {
  expect("dflaj").toBeTruthy();
  expect(false).toBeFalsy();
})

test('test number', ()=> {
  expect(4).toBeGreaterThan(2);
  expect(2).toBeLessThan(8);
})

test('test object', ()=> {
  expect({name: 'gugu'}).toEqual({name: 'gugu'})
})

//查看变量是否被定义
var a = "dlakfjlas";
test('test variable', ()=> {
  expect(a).toBeDefined()
})
//测试是否有length属性的长度对不对
test('test length', ()=> {
  expect([1,4,5,4,5]).toHaveLength(5)
  //expect([1,4,5,4,5]).toHaveLength(6)//报错
  expect("alsjlfkj").toHaveLength(8)//通过
  //expect("abc").toHaveLength(2)//不通过
})