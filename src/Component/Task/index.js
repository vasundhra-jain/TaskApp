import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const Tag = props => {
  const {detail, changeActiveTag, isTrue} = props
  const {optionId, displayText} = detail

  const onChangeActiveTag = () => {
    changeActiveTag(optionId)
  }

  const add = isTrue ? 'add-on' : ''

  return (
    <li>
      <button
        type="button"
        className={`tag-button ${add}`}
        onClick={onChangeActiveTag}
      >
        {displayText}
      </button>
    </li>
  )
}

const TaskItem = props => {
  const {detail} = props
  const {name, tagName} = detail

  return (
    <li className="task-list-item">
      <p className="task-name-para">{name}</p>
      <div className="task-item-tag-container">
        <p>{tagName}</p>
      </div>
    </li>
  )
}

class Task extends Component {
  state = {
    taskList: [],
    textInputValue: '',
    selectedTag: tagsList[0].optionId,
    activeTag: '',
  }

  changeActiveTag = id => {
    const {activeTag} = this.state
    if (activeTag === id) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: id})
    }
  }

  changeTextInputValue = event => {
    this.setState({textInputValue: event.target.value})
  }

  changeSelectedTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {taskList, textInputValue, selectedTag} = this.state
    const selectedTagDetail = tagsList.filter(
      each => each.optionId === selectedTag,
    )
    const newTask = {
      id: uuidv4(),
      name: textInputValue,
      tagId: selectedTag,
      tagName: selectedTagDetail[0].displayText,
    }
    this.setState({
      taskList: [...taskList, newTask],
      textInputValue: '',
      selectedTag: tagsList[0].optionId,
    })
  }

  filterData = () => {
    const {activeTag, taskList} = this.state
    if (activeTag === '') {
      const filteredData = taskList
      return filteredData
    }
    const filteredData = taskList.filter(each => each.tagId === activeTag)
    return filteredData
  }

  render() {
    const taskList = this.filterData()
    const {textInputValue, selectedTag, activeTag} = this.state
    return (
      <div className="task-container">
        <form className="task-container-1">
          <h1 className="task-container-1-heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              className="input"
              type="text"
              id="task"
              value={textInputValue}
              placeholder="Enter the task here"
              onChange={this.changeTextInputValue}
            />
          </div>
          <div className="input-container">
            <label htmlFor="select" className="label">
              Tags
            </label>
            <select
              id="select"
              className="input"
              onChange={this.changeSelectedTag}
              value={selectedTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-task-btn" onClick={this.addTask}>
            Add Task
          </button>
        </form>
        <div className="task-container-2">
          <h1 className="task-container-2-heading">Tags</h1>
          <ul className="unordered-list">
            {tagsList.map(each => (
              <Tag
                detail={each}
                key={each.optionId}
                changeActiveTag={this.changeActiveTag}
                isTrue={each.optionId === activeTag}
              />
            ))}
          </ul>
          <h1 className="task-container-2-heading">Tasks</h1>
          <div>
            {taskList.length === 0 ? (
              <div className="empty-list-container">
                <p className="empty-list-para">No Tasks Added Yet</p>
              </div>
            ) : (
              <ul className="task-unordered-list">
                {taskList.map(each => (
                  <TaskItem detail={each} key={each.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Task
