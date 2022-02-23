import { GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient } from '../../sanity'
import { Post } from '../../typings'

const Post = () => {
   return (
      <main>
         <Header/>
      </main>
   )
}

export const getStaticPaths = async () =>{
   const query = `
      *[_type == "post"]{
         _id,
         slug{
            current
         }
      }
   `

   const posts:Post[] = await sanityClient.fetch(query)

   const paths = posts.map(post=>({
      params:{
         slug: post.slug.current
      }
   }))

   return {
      paths,
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async ({params})=>{

   return {
      props: {}
   }
}

export default Post