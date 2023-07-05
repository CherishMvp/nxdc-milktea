import packages from './packages';
import store from './store';
import { goods, mockGoods, def } from './goods';
import levelBenefits from './level-benefits';
import member from './member';
import rechargeCards from './rechargeCards';
import addresses from './addresses';
import attendance from './attendance';
import customPoints from './custom-points';
import pointsMall from './points-mall';
import attendanceList from './attendance-list';
import todayAttendance from './today-attendance';
import orders from './orders';
import customerCoupons from './customer-coupons';
import giftCards from './gift-cards';

const json = {
  packages,
  store,
  goods,
  mockGoods,
  def,
  levelBenefits,
  member,
  rechargeCards,
  addresses,
  attendance,
  customPoints,
  pointsMall,
  attendanceList,
  todayAttendance,
  orders,
  customerCoupons,
  giftCards,
};
const localApi = 'http://127.0.0.1:4523/m1/1342106-0-default';
const yunApi = 'https://mock.apifox.cn/m1/1342106-0-default';
// const localInfo=uni.getStorageSync(name);
export const localInfo = (name) => {
  let aa = uni.getStorageSync(name);
  console.log(aa);
  return aa;
};

export { localApi, yunApi };
export default (name) => new Promise((resolve) => resolve(json[name]), 500);
