import { FC } from 'react'
import { View } from '@tarojs/components'

import './ArticleCard.less'

interface IProps {
  detail: any
  type: 'category' | 'article'
}
const ArticleCard: FC<IProps> = (props) => {
  const { detail } = props
  return (
    <View className='article-card'>
      <View className='article-card__header'>{detail.title}</View>
      <View className='article-card__content'>
        <View className='article-card__content--desc'>{detail.desc}</View>
        <View className='article-card__content--author'>{detail.author}</View>
      </View>
    </View>
  )
}

export default ArticleCard
