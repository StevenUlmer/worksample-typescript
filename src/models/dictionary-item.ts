export class DictionaryItem {
  key: string;
  private _members: string[] = [];

  constructor(key: string) {
    this.key = key;
  }

  get members(): string[] {
    return this._members;
  }

  addMember(member: string): string {
    if (this.memberExists(member)) {
      return ') ERROR, member already exists for key';
    }
    this.members.push(member);
    return ') Added';
  }

  removeMember(member: string): string {
    const index = this.members.indexOf(member);
    if (index === -1) {
      return ') ERROR, member does not exist';
    }

    this.members.splice(index, 1);
    return ') Removed';
  }

  memberExists(member: string): boolean {
    return this.members.indexOf(member) !== -1;
  }
}