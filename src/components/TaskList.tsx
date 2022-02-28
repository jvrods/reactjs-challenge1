import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');



  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    const newTask = {                           // Aqui a nova task com o que ela recebe que ta definido na interface
      id: Math.random(),                         //id aleatória
      title: newTaskTitle,                        // o título que vou passar
      isComplete: false                            //o isComplete  é um boolean 
    }

    setTasks(oldState => [...oldState, newTask]);   //setando a nova task (usando o spreed operation ("...") para pegar o que ja estava no array pegando o que ja tinha usando o "oldstate" e passando o newTask.
    setNewTaskTitle('');                            // assim que a task é adicionando o campo de setar fica vazio novamente.

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(task => task.id === id ? {  //usamos a função map pra ir em cada uma das tasks passando as ids conferindo se é igual para adicionar o checked de completa ou não.
      ...task,
      isComplete : !task.isComplete
    }: task);

    setTasks(newTasks)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const removeTasks = tasks.filter(task => task.id !== id);

    setTasks(removeTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}