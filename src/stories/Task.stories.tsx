import React from 'react';
import { action } from '@storybook/addon-actions';
import Task from '../Task';


export default {
  title: 'Task stories',
  component: Task
}

const changeStatus = action('Status changed inside Task');
const changeTaskTitle = action('Task title changed inside Task');
const removeTask = action('remove button inside Task clicked')

export const TaskBaseExample = (props: any) => {
  return (
    <div>
      <Task
        task={{ id: '1', isDone: true, title: 'JS' }}
        changeStatus={changeStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
        todoListID={'todoListId1'}     

      />
      <Task
        task={{ id: '2', isDone: false, title: 'React' }}
        changeStatus={changeStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
        todoListID={'todoListId2'}     

      />
    </div>)
}

