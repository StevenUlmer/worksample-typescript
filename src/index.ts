import { question } from 'readline-sync';
import { Dictionary } from './models/dictionary';

async function run() {
  let dictionary = new Dictionary();
  while(true) {
    const input = question('> ');
    const inputParams = input.split(' ');
    let output: string[] = [];

    switch (inputParams[0]) {
      case 'ADD':
        output = dictionary.add(inputParams[1], inputParams[2]);
        break;
      case 'MEMBERS':
        output = dictionary.getMembers(inputParams[1]);
        break;
      case 'KEYS':
        output = dictionary.getKeys();
        break;
      case 'REMOVE':
        output = dictionary.removeMember(inputParams[1], inputParams[2]);
        break;
      case 'REMOVEALL':
        output = dictionary.removeAllMembers(inputParams[1]);
        break;
      case 'CLEAR':
        output = dictionary.clearAllKeys();
        break;
      case 'KEYEXISTS':
        output = dictionary.keyExists(inputParams[1]);
        break;
      case 'MEMBEREXISTS':
        output = dictionary.memberExists(inputParams[1], inputParams[2]);
        break;
      case 'ALLMEMBERS':
        output = dictionary.allMembers();
        break;
      case 'ITEMS':
        output = dictionary.allItems();
        break;
      case 'quit':
      case 'exit':
        return;
      default:
        output = [') Not a valid input'];
    };

    output.forEach((response: string) => {
      console.log(response);
    });
  }
}

run().then();