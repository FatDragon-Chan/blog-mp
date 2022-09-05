import {createContext} from 'react';
import {createSelectorQuery} from '@tarojs/taro'
import { PaintInspectionBasicContext, PaintInspectionScratchContext } from './types';

export const PaintBasicContext = createContext<PaintInspectionBasicContext>({
  paintBasicForm: {
    plate_number: '',
    vin: '',
    plate: '',
    province: '',
    showKeyboard: false,
  },
  setPaintBasicForm: () => {},
}); // PaintInspectionBasicForm 初始值

export const PaintScratchContext = createContext<PaintInspectionScratchContext>({
  scratch: {
    damage: [],
    image_urls: [],
  },
  setScratch: () => {},
});

// 获取canvas 对象
export const getContainer: (id)=> any = (id) => new Promise((resolve, reject) => {
  const query = createSelectorQuery();
  query
    .select(id)
    .fields({ node: true, size: true })
    .exec(res => {
      if (res && res.length > 0) {
        resolve(res[0]);
      } else {
        reject(new Error('获取canvas对象失败'));
      }
    });
});
