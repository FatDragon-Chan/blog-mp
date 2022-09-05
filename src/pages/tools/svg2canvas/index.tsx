import { useState, useEffect } from 'react';
import { Canvas, View } from '@tarojs/components';
import {useDidShow, getSystemInfoSync, nextTick} from '@tarojs/taro';

import { getContainer } from './utils'
import {Stage} from './utils/svg2canvas.umd'
import './index.less';
import svgConfig from './config/svgConfig.json'
import {scratchInfosCaseEnum} from './types'

let stage

const Svg2Canvas = () => {
  const config = svgConfig

  const [wrapView, setWrapView] = useState({width: 300, height: 300})
  const [damage, setDamage] = useState<string[]>([])
  const [popupVisible, setPopupVisible] = useState(false)
  const [popupDamagePlace, setPopupDamagePlace] = useState('')
  const initWrap = async () => {

    const canvasWrap = await getContainer('#canvasWrap');
    console.log('canvasWrap: ', canvasWrap)
    setWrapView({
      width: canvasWrap.width,
      height: canvasWrap.height
    })
  }

  const touchstart = (event) => {
    stage?.touchStartHandler(event);
  };
  const touchend = (event) => {
    stage?.touchEndHandler(event);
  };

  const canvasChange = (changeKey: string) => {
    console.log('changeKey: ', changeKey)
    if (damage.includes(changeKey)) return
    setPopupDamagePlace(changeKey)
  }

  const initCanvas = async () => {
    const canvas = await getContainer('#canvas');
    const osCanvas = await getContainer('#hitCanvas');

    if (!canvas) return
    const dpr = getSystemInfoSync().pixelRatio;
    const stageConfig= {
      canvasRes: canvas.node,
      osCanvasRes: osCanvas.node,
      dpr,
      width: wrapView.width,
      height: wrapView.height
    }
    stage = new Stage(stageConfig, canvasChange);
    updateCanvas()
  };

  /**
   * 与初始化canvas分割开
   */
  const updateCanvas = () => {
    stage?.clear();
    stage?.init(config)
    stage?.render()
  }

  useEffect(() => {
    console.log('popupDamagePlace: ', popupDamagePlace)
    if (!popupDamagePlace) return
    stage?.setActions([...damage, popupDamagePlace])
    setPopupVisible(true)
  }, [popupDamagePlace]);

  const handleCloseDamagePopup = () => {
    stage?.setActions(damage)
    setPopupVisible(false);
    setPopupDamagePlace('');
  };

  const handleSelectDamage = () => {
    const newDamage = [...damage, popupDamagePlace]
    stage?.setActions(newDamage)
    setDamage(newDamage);
    setPopupVisible(false);
    setPopupDamagePlace('');
  };



  useDidShow(() => {
    console.log('useDidShow')
    nextTick(initWrap)
  })

  useEffect(() => {
    console.log('wrapView: ', wrapView)
    initCanvas();
  }, [wrapView]);

  // @ts-ignore
  // @ts-ignore
  return (
    <View id='canvasWrap' className='paint-inspection-car'>
      <Canvas
        onTouchEnd={touchend}
        onTouchStart={touchstart}
        className='canvas'
        id='canvas'
        type='2d'
        style={{width: `${wrapView.width}px`, height: `${wrapView.height}px`}}
      />
      {/* 隐藏的点击canvas */}
      <Canvas
        className='hit-canvas'
        id='hitCanvas'
        type='2d'
        style={{width: `${wrapView.width}px`, height: `${wrapView.height}px`}}
      />
      {popupVisible && (
        <View className='damage-popup__mask' onClick={handleCloseDamagePopup}>
          <View className='damage-popup__content' catchMove>
            <View className='damage-popup__title'>
              请选择受损情况
              <View className='damage-popup__close' onClick={handleCloseDamagePopup} />
            </View>
            {
              scratchInfosCaseEnum.map(item => (
                <View className='damage-popup__item' onClick={() => { handleSelectDamage(); }}>
                  {item.popupValue}
                </View>
              ))
            }
          </View>
        </View>
      )}
    </View>
  );
};

export default Svg2Canvas
