import Vue from 'vue';
const DISH = [
  {
    id: 'k13hkr31413',
    name: '飘香拌面',
    info: '就是麻酱加点面条',
    fee: 5,
    effect: 5
  }, {
    id: '3rf2f34g343',
    name: '蒸饺',
    info: '蒸饺，就是那个蒸饺，篓子上摆了几个饺子，中间一碟醋',
    fee: 5,
    effect: 5
  }, {
    id: 'ri2h3jhfsd',
    name: '鸭腿饭',
    info: '官方大酒店主打，米饭上托举着硕大的鸭腿，有饭有肉',
    fee: 14,
    effect: 10
  }, {
    id: 'hkjhk32h4123kj',
    name: '大排饭',
    info: '相比鸭腿饭仁者见仁智者见智，差不多的档次配置',
    fee: 14,
    effect: 10
  }, {
    id: '1ui5hi1hr3',
    name: '至尊商务套餐',
    info: '各种浇头随意搭配，脑海里想象一下沙县里的那个堆满卤味的盆，嗯，就是那样',
    fee: 25,
    effect: 20
  }
]

const state = {
  dishes: DISH,
  selectdedDishIndedx: 0
}

const mutations = {
  selectDish(state, dir) {
    const {selectdedDishIndedx, dishes} = state;
    let index = selectdedDishIndedx + dir;
    if (index < 0)
      index = dishes.length - 1;
    if (index >= dishes.length)
      index = 0;
    state.selectdedDishIndedx = index;
  }
}

export default {
  state,
  mutations
}
