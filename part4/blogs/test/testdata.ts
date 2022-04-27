import { BlogSchema } from "../src/models/blog"
import { UserSchema } from "../src/models/user"

export const blogs: Array<BlogSchema> = [
  {
    title: "All About Coffee",
    author: "Beany McBeanface",
    url: "http://all.about.coffee",
    likes: 42,
    comments: []
  },
  {
    title: "All About Chuck Norris",
    author: "Chucky McChuckface",
    url: "http://all.about.chucknorr.is",
    likes: 666,
    comments: []
  },
  {
    title: "All About Boats",
    author: "Boaty McBoatface",
    url: "http://all.about.boats",
    likes: 13,
    comments: []
  },
  {
    title: "All About Java",
    author: "Beany McBeanface",
    url: "http://all.about.java",
    likes: 7,
    comments: []
  },
  {
    title: "All About Cheese",
    author: "Cheesy McCheeseface",
    url: "http://all.about.jeez",
    likes: 1,
    comments: []
  },
  {
    title: "All About Kovfefe",
    author: "Beany McBeanface",
    url: "http://all.about.kovfefe",
    likes: 313,
    comments: []
  },
  {
    title: "All About Ronald McDonald",
    author: "RonaldMcDonaldy McRonaldMcDonaldface",
    url: "http://all.about.ran.ran.rooooo",
    likes: 159,
    comments: []
  },
  {
    title: "Still Some More About Chuck Norris",
    author: "Chucky McChuckface",
    url: "http://moar.about.chuckchorr.is",
    likes: 33,
    comments: []
  }
]

export const users: Array<UserSchema> = [
  {
    username: "spongebob",
    name: "Spongebob Squarepants",
    pwHash: "$2a$10$G3PibHySjCjHksyBdWV7vORitpn8OBWQHouN35nOHvWUZACPJGjeO",  // qwerty123
    blogs: []
  },
  {
    username: "cnorris",
    name: "Chuck Norris",
    pwHash: "$2a$10$u7WE1.VQ14CgUzbdq4ZlYuzEryH75V6cI0CgTXSG5pQmHi4gXwsFW",  // qwerty123
    blogs: []
  }
]
