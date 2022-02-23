import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'

const Home: NextPage = (props) => {
   console.log(props)
   return (
      <div className='max-w-7xl mx-auto'>
         <Head>
            <title>Medium Blog</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Header />
         <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
            <div className='px-10 space-y-5'>
               <h1 className='text-6xl font-serif max-w-xl'>
                  <span className='underline decoration-black decoration-2'>Medium</span> is a place to write read and connect</h1>
               <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti perspiciatis harum veniam.</h2>
            </div>

            <img
               className='hidden md:inline-flex lg:h-full h-32'
               src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
               alt=""
            />
         </div>
      </div>
   )
}

export default Home

export const getServerSideProps = async () => {
   const query = `*[_type == "post"]{
      _id,
      title,
      author->{
      name,
      image
    },
    description,
    mainImage,
    slug
    }`

   const posts = await sanityClient.fetch(query)

   return {
      props: {
         posts
      }
   }
}