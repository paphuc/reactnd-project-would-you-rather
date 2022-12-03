import { receiveQuestions, addAnswer, addQuestion   } from './questions'
import { receiveUsers, addQuestionForUser } from './users'
import { getInitialData } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
import { saveQuestionAnswer, saveQuestion } from '../utils/api'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        getInitialData()
        .then (({users, questions}) => {
            dispatch(receiveQuestions(questions))
            dispatch(receiveUsers(users))
            dispatch(setAuthedUser(AUTHED_ID))
        })
    }
}

export function handleAnswerQuestion (authedUser, qid, answer) {
  return (dispatch) => {
    saveQuestionAnswer({
      authedUser: authedUser,
      qid,
      answer,
    }).then(() => {
      dispatch(addAnswer(authedUser, qid, answer))
    })
  }
}



export function handleAddQuestion (authedUser, optionOne, optionTwo) {
  return (dispatch) => {
    saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestionForUser(question))
      dispatch(addQuestion(question))
    })
  }
}