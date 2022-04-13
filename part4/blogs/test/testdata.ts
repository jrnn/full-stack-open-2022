import { Blog } from "../src/models/blog"
import { UserSchema } from "../src/models/user"

export const blogs: Array<Blog> = [
  {
    title: "All About Coffee",
    author: "Beany McBeanface",
    url: "http://all.about.coffee",
    likes: 42
  },
  {
    title: "All About Chuck Norris",
    author: "Chucky McChuckface",
    url: "http://all.about.chucknorr.is",
    likes: 666
  },
  {
    title: "All About Boats",
    author: "Boaty McBoatface",
    url: "http://all.about.boats",
    likes: 13
  },
  {
    title: "All About Java",
    author: "Beany McBeanface",
    url: "http://all.about.java",
    likes: 7
  },
  {
    title: "All About Cheese",
    author: "Cheesy McCheeseface",
    url: "http://all.about.jeez",
    likes: 1
  },
  {
    title: "All About Kovfefe",
    author: "Beany McBeanface",
    url: "http://all.about.kovfefe",
    likes: 313
  },
  {
    title: "All About Ronald McDonald",
    author: "RonaldMcDonaldy McRonaldMcDonaldface",
    url: "http://all.about.ran.ran.rooooo",
    likes: 159
  },
  {
    title: "Still Some More About Chuck Norris",
    author: "Chucky McChuckface",
    url: "http://moar.about.chuckchorr.is",
    likes: 33
  }
]

export const users: Array<UserSchema> = [
  {
    username: "spongebob",
    name: "Spongebob Squarepants",
    pwHash: "$2a$10$pjJZKnMRH.pU3qYyugjokuTwOUQZPSukyPlaMRj0th7I/T.cxuVlm",  // qwerty
  },
  {
    username: "cnorris",
    name: "Chuck Norris",
    pwHash: "$2a$10$kl8WWW1DHIjQ8YtGyI4HXu0uVU/hPcVtneUH/hz7sc4/RlixAmIRy",  // trustno1
  }
]
