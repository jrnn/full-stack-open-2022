import { Anecdote } from "../types"

const toAnecdote = (content: string): Anecdote => ({
  id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  content,
  votes: 0
})

const sortByVotes = (p: Anecdote, q: Anecdote) => q.votes - p.votes

export const initialAnecdotes: Array<Anecdote> = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
].map(toAnecdote)

enum ActionType {
  ADD = "ADD_ANECDOTE",
  VOTE = "VOTE_FOR_ANECDOTE"
}

type AnecdoteAction = Readonly<{
  type: ActionType.ADD,
  content: string
}> | Readonly<{
  type: ActionType.VOTE,
  id: number
}>

type AnecdoteState = ReadonlyArray<Anecdote>

export const addAnecdote = (content: string): AnecdoteAction => ({ type: ActionType.ADD, content })

export const voteForAnecdote = (id: number): AnecdoteAction => ({ type: ActionType.VOTE, id })

export const anecdoteReducer = (state: AnecdoteState, action: AnecdoteAction): AnecdoteState => {
  switch (action.type) {
    case ActionType.ADD:
      return state.concat(toAnecdote(action.content))
    case ActionType.VOTE:
      return state.map(anecdote => anecdote.id !== action.id
        ? anecdote
        : { ...anecdote, votes: anecdote.votes + 1 })
        .sort(sortByVotes)
    default:
      throw new Error()
  }
}
