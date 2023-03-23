import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

export default function Post({postData}) {
  return (
      <Layout>
        <Head>
          <title>{ postData.title }</title>
        </Head>
        <article>
          <h1 className='font-bold text-3xl'>{ postData.title }</h1>
          <br/>
          { postData.date }
          <br/>
          <div dangerouslySetInnerHTML={ {__html: postData.contentHtml} }/>
        </article>
      </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(p) {
  console.log('p', p)
  // console.log('params',params)
  const postData = await getPostData(p.params.id);
  return {
    props: {
      postData,
    },
  };
}