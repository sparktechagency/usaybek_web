import { BlogsCard } from '@/components/reuseable/blog-card'
import SubTilte from '@/components/reuseable/sub-title'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Blgos",
  description: "Explore our latest blog posts on health, wellness, and expert medical insights. Stay informed with up-to-date information and professional guidance",
};


const blogsItem = [
  {
    "id": 1,
    "title": "Blog post title goes here",
    "description": "Lorem ipsum dolor sit amet consectetur. Fusce pulvinar aliquam sit consequat aliquam nunc nunc tellus sed. Et enim porttitor pellentesque blandit neque quam sagittis enim quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Mauris euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc.",
    "image": "/images/blog-1.jpg"
  },
  {
    "id": 2,
    "title": "Blog post title goes here",
    "description": "Lorem ipsum dolor sit amet consectetur. Fusce pulvinar aliquam sit consequat aliquam nunc nunc tellus sed. Et enim porttitor pellentesque blandit neque quam sagittis enim quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Mauris euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc.",
    "image": "/images/blog-2.jpg"
  },
  {
    "id": 3,
    "title": "Blog post title goes here",
    "description": "Lorem ipsum dolor sit amet consectetur. Fusce pulvinar aliquam sit consequat aliquam nunc nunc tellus sed. Et enim porttitor pellentesque blandit neque quam sagittis enim quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Mauris euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc.",
    "image": "/images/blog-3.jpg"
  },
  {
    "id": 4,
    "title": "Blog post title goes here",
    "description": "Lorem ipsum dolor sit amet consectetur. Fusce pulvinar aliquam sit consequat aliquam nunc nunc tellus sed. Et enim porttitor pellentesque blandit neque quam sagittis enim quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Mauris euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc.",
    "image": "/images/blog-4.jpg"
  },
  {
    "id": 5,
    "title": "Blog post title goes here",
    "description": "Lorem ipsum dolor sit amet consectetur. Fusce pulvinar aliquam sit consequat aliquam nunc nunc tellus sed. Et enim porttitor pellentesque blandit neque quam sagittis enim quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Mauris euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc.",
    "image": "/images/blog-5.jpg"
  },
  {
    "id": 6,
    "title": "Blog post title goes here",
    "description": "Lorem ipsum dolor sit amet consectetur. Fusce pulvinar aliquam sit consequat aliquam nunc nunc tellus sed. Et enim porttitor pellentesque blandit neque quam sagittis enim quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Mauris euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nunc nunc sit amet nunc.",
    "image": "/images/blog-6.jpg"
  }
]



export default function Blogs() {
  return (
    <div>
      <SubTilte title='Blogs' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {blogsItem.map((item, index) => <BlogsCard {...item} key={index} />)}
      </div>
    </div>
  )
}
