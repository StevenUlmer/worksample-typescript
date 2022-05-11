import { DictionaryItem } from "./dictionary-item";

export class Dictionary {
  dictionaryItems: DictionaryItem[] = [];

  add(key: string, member: string): string[] {
    if (!key) {
      return [') ERROR, please supply a key to add a member to'];
    }
    if (!member) {
      return [`) ERROR, please supply a member to add to ${key}`];
    }

    let dictionaryItem = this.getItem(key);

    if (dictionaryItem === undefined) {
      dictionaryItem = new DictionaryItem(key);
      this.dictionaryItems.push(dictionaryItem);
    }
    const response = dictionaryItem.addMember(member);

    return [`${response}`];
  }

  getKeys(): string[] {
    const keys: string[] = this.dictionaryItems.map((item: DictionaryItem) => { return item.key });

    if (keys.length == 0) {
      return ['(empty set)'];
    }

    return this.formatNumberedResponse(keys);
  }

  getMembers(key: string): string[] {
    if (!key) {
      return [') ERROR, please supply a key to get members from'];
    }

    const item = this.getItem(key);

    if (item == undefined) {
      return [') ERROR, key does not exist'];
    }

    return this.formatNumberedResponse(item.members);
  }

  removeMember(key: string, member: string): string[] {
    if (!key) {
      return [') ERROR, please supply a key to remove a member from'];
    }
    if (!member) {
      return [`) ERROR, please supply a member to remove from ${key}`];
    }

    const item = this.getItem(key);

    if (item === undefined) {
      return [') ERROR, key does not exist'];
    }

    const response = item.removeMember(member);

    if (item.members.length == 0) {
      this.removeAllMembers(key);
    }

    return [`${response}`];
  }

  removeAllMembers(key: string): string[] {
    const index = this.dictionaryItems.findIndex(x => { return x.key == key });

    if (index === -1) {
      return [') ERROR, key does not exist'];
    }

    this.dictionaryItems.splice(index, 1);
    return [') Removed'];
  }

  clearAllKeys(): string[] {
    this.dictionaryItems = [];
    return [') Cleared'];
  }

  keyExists(key: string): string[] {
    const item = this.getItem(key);
    return [`) ${item !== undefined ? 'true' : 'false'}`];
  }

  memberExists(key: string, member: string): string[] {
    const item = this.getItem(key);
    let response = 'true';

    if (item === undefined || !item.memberExists(member)) {
      response = 'false';
    }

    return [`) ${response}`];
  }

  allMembers(): string[] {
    if (this.dictionaryItems.length == 0) {
      return ['(empty set)'];
    }

    let members: string[] = [];
    this.dictionaryItems.forEach((item: DictionaryItem) => {
      members = members.concat(item.members);
    });

    return this.formatNumberedResponse(members);
  }

  allItems(): string[] {
    if (this.dictionaryItems.length == 0) {
      return ['(empty set)'];
    }

    let allMembers: string[] = [];
    this.dictionaryItems.forEach((item: DictionaryItem) => {
      let itemMembers: string[] = item.members.map((member: string) => {
        return `${item.key}: ${member}`;
      });
      allMembers = allMembers.concat(itemMembers);
    });

    return this.formatNumberedResponse(allMembers);
  }

  private getItem(key: string): DictionaryItem | undefined {
    return this.dictionaryItems.find(x => x.key == key);
  }

  private formatNumberedResponse(items: string[]): string[] {
    return items.map((item: string, index: number) => {
      return `${index + 1}) ${item}`;
    });
  }
}