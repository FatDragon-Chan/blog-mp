import { FC, useState } from 'react'
import { View } from '@tarojs/components'

import './index.less'
import ArticleCard from "../components/ArticleCard";


const ArticleCategoryList: FC = () => {
  const [articleList, setArticleList] = useState([
    {
      title: '🔧 不行自己来',
      desc: '实在不行自己上，再不行就买吧',
      id: 1,
      author: 'AHone'
    },    {
      title: '🔧 不行自己来',
      desc: '实在不行自己上，再不行就买吧',
      id: 1,
      author: 'AHone'
    },
  ])

  return (
    <View className='article-list'>
      {
        articleList.map(article => (
          <ArticleCard detail={article} type='category' />
        ))
      }
    </View>
  )
}

export default ArticleCategoryList
