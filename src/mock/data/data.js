const Mock = require('mockjs');
const Random = Mock.Random;

exports.testData = Mock.mock({
  'user|10': [
    {
      'id|+1': 1123,
      name: '@cname',
      email: '@email',
      avatar: '@image(300x300)'
    }
  ]
});

exports.myFavorite = Mock.mock({
  'meeting|9': [
    {
      'id|+1': 123,
      name: '2019华为校园招聘会|招聘类',
      location: '科技会堂',
      startTime: '2019.10.12 14:00:00',
      closeTime: '2019.10.12 17:00:00',
      img: '@image(190x85)'
    }
  ]
});
exports.awesomeMeeings = Mock.mock({
  'meeting|9': [
    {
      'id|+1': 123,
      name: '2019华为校园招聘会|招聘类',
      img: '@image(190x85)'
    }
  ]
});

exports.singalMeeting = Mock.mock({
  id: 123,
  meetingIcon: '@image(378x252)',
  meetingName: '2019华为校园招聘会|招聘类',
  meetingAddr: '科技会堂',
  startTime: '2019.10.12 14:00:00',
  closeTime: '2019.10.12 17:00:00',
  meetingIntroduction:
    '为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘,为深入发展,展开招聘',
  meetingSchedule: '2019.10.12 14:00 宣讲,2019.10.12 15:00 招聘',
  organizer: '华为技术有限公司',
  principal: '李晓华',
  communicate: '155232545632',
  guest: [
    { icon: '@image(82x82)', name: '李磊', introduction: '华为hr' },
    { icon: '@image(82x82)', name: '李汗', introduction: '华为前端工程师' },
    { icon: '@image(82x82)', name: '赵四', introduction: '华为后端工程师' },
    { icon: '@image(82x82)', name: '韩梅梅', introduction: '华为架构师' },
    { icon: '@image(82x82)', name: '李磊', introduction: '华为hr' },
    { icon: '@image(82x82)', name: '李汗', introduction: '华为前端工程师' },
    { icon: '@image(82x82)', name: '赵四', introduction: '华为后端工程师' },
    { icon: '@image(82x82)', name: '韩梅梅', introduction: '华为架构师' }
  ],
  voluntIntroduction: '搭建场所',
  voluntStartTime: '8:00',
  voluntCloseTime: '17:00',
  voluntNum: '8',
  isNeedProof: true
});
