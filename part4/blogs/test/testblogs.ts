import { Blog } from "../src/models/blog"

export const blogs: Array<Blog> = [
  {
    title: "All About Coffee",
    author: "Beany McBeanface",
    url: "http://all.about.coffee",
    likes: 42
  },
  {
    title: "All About Kovfefe",
    author: "Beany McBeanface",
    url: "http://all.about.kovfefe",
    likes: 666
  },
  {
    title: "All About Boats",
    author: "Boaty McBoatface",
    url: "http://all.about.boats",
    likes: 13
  },
  {
    title: "All About Cheese",
    author: "Cheesy McCheeseface",
    url: "http://all.about.jeez",
    likes: 1
  }
]

export const randomBlog = (): Blog => {
  return blogs[Math.floor(Math.random() * blogs.length)] as Blog
}
