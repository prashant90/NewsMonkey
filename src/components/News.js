import React,{useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  //const [max, setMax] = useState(0)
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () =>{
    props.setProgress(10);
    const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&max=${props.max}`; 
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
      // eslint-disable-next-line
  },[])
 

  const fetchMoreData = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&max=${props.max}`; 
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <div className="container my-3">
        <h1 className='text-center' style={{marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container">
          <div className="row">
            {articles.map((article, index)=>{
              return <div className="col-md-4" key={`${article.title}-${index}`}>
                  <Newsitem title={article.title?article.title:""} description={article.description?article.description:""} imageUrl={article.image} newsUrl={article.url} author={article.source.name} date={article.publishedAt}/>
              </div>
            })}
          </div>
        </div>
        </InfiniteScroll>
      </div>
    )
}

News.defaultProps = {
    country: 'in',
    page: 8,
    category: 'general',
    max: 5,
  }

News.propsTypes = {
    country: PropTypes.string, 
    page: PropTypes.number,
    category: PropTypes.string,
    max:PropTypes.number
  }


export default News