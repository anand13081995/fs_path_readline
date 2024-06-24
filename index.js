const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const tasksFilePath = path.join(__dirname, 'tasks.txt');

function readTasks() {
    if (!fs.existsSync(tasksFilePath)) {
        return [];
    }
    const tasks = fs.readFileSync(tasksFilePath, 'utf-8').split('\n').filter(Boolean);
    return tasks.map(task => JSON.parse(task));
}

function writeTasks(tasks) {
    fs.writeFileSync(tasksFilePath, tasks.map(task => JSON.stringify(task)).join('\n'));
}

function addTask() {
    const taskDescription = readline.question('Enter the task description: ');
    const tasks = readTasks();
    tasks.push({ description: taskDescription, complete: false });
    writeTasks(tasks);
    console.log('Task added successfully.');
}

function viewTasks() {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. [${task.complete ? 'x' : ' '}] ${task.description}`);
        });
    }
}

function completeTask() {
    const tasks = readTasks();
    viewTasks();
    const taskIndex = readline.questionInt('Enter the task number to mark as complete: ') - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks[taskIndex].complete = true;
        writeTasks(tasks);
        console.log('Task marked as complete.');
    } else {
        console.log('Invalid task number.');
    }
}

function removeTask() {
    const tasks = readTasks();
    viewTasks();
    const taskIndex = readline.questionInt('Enter the task number to remove: ') - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
        writeTasks(tasks);
        console.log('Task removed successfully.');
    } else {
        console.log('Invalid task number.');
    }
}

function main() {
    while (true) {
        console.log('\nTask Manager');
        console.log('1. Add a new task');
        console.log('2. View tasks');
        console.log('3. Mark a task as complete');
        console.log('4. Remove a task');
        console.log('5. Exit');
        const choice = readline.questionInt('Choose an option: ');
        switch (choice) {
            case 1:
                addTask();
                break;
            case 2:
                viewTasks();
                break;
            case 3:
                completeTask();
                break;
            case 4:
                removeTask();
                break;
            case 5:
                console.log('Exiting...');
                process.exit(0);
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}

main();
