import { GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient } from '../../sanity'
import { Post } from '../../typings'

interface Props {
   post: Post
}

const Post = ({post}: Props) => {
   return (
      <main>
         <Header />
      </main>
   )
}

export const getStaticPaths = async () => {
   const query = `
      *[_type == "post"]{
         _id,
         slug{
            current
         }
      }
   `

   const posts: Post[] = await sanityClient.fetch(query)

   const paths = posts.map(post => ({
      params: {
         slug: post.slug.current
      }
   }))

   return {
      paths,
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author-> {
        name,
        image
      },
      description,
      mainImage,
      body,
      slug
   }`

   const post = sanityClient.fetch(query, {slug: params?.slug}) 

   if(!post){
      return {
         notFound: true
      }
   }
   return {
      props: {post},
      revalidate: 60
   }
}

export default Post