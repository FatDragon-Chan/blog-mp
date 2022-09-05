/**
 * 首页
 */
import { FC, useState } from "react";
import { navigateTo } from '@tarojs/taro'
import { View, Image } from "@tarojs/components";


import blogConfig from '../../../../blog.config.json'
import './index.less'
import {ArticleCategoriesListItemTypes} from "./types";

const Index:FC = () => {
  const [categories, setCategories] = useState<ArticleCategoriesListItemTypes[]>([
    {
      category_name: '🔧 不行自己来',
      category_id: 1,
    },
    {
      category_name: '‍💻 入门到放弃',
      category_id: 2,
    },
  ])

  const handleToArticleList = (id: number) => {
    navigateTo({url: `/pages/article/list/index?categoryId=${id}`})
  }

  const handleToSvg2Canvas = () => {
    navigateTo({url: `/pages/tools/svg2canvas/index`})
  }

  return (
    <View className='index-wrapper'>
      <Image className='index-wrapper__avatar' src={blogConfig.avatar} />
      <View className='index-wrapper__desc'>{blogConfig.desc}</View>
      <View className='index-wrapper__category'>
        {
          categories.map(category => (
            <View
              className='index-wrapper__category--btn'
              onClick={() => handleToArticleList(category.category_id)}
            >
              {category.category_name}
            </View>
          ))
        }
      </View>
      <View className='index-wrapper__category'>
        <View
          className='index-wrapper__category--btn'
          onClick={() => handleToSvg2Canvas()}
        >
          Svg2Canvas
        </View>
      </View>

    </View>
  );
};

export default Index;
