import { getTime } from './index'

export interface Iitem {
  meetingid: number;
  mName: string | null;
  location: string;
  startTime: string;
  closeTime: string;
  introduction: string;
  schedule: string;
  needvolunteer: number;
  typeid: number;
  organizer: string;
  hostedby: string;
  communicate: string;
}

export const transformItemList = (data: Iitem[]) => {
  return data.map(item => {
    return {
      id: item.meetingid,
      src: '',
      title: item.mName,
      time: getTime(item.startTime, item.closeTime),
      favorite: false,
    }
  })
}