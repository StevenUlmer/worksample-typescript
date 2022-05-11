import { Dictionary } from './dictionary';

describe("Dictionary", ()=> {
  let dictionary: Dictionary;

  beforeEach(() => {
    dictionary = new Dictionary();
  });
   
  describe("add", () => {
    it('should add an item if no key exists', () => {
      const response = dictionary.add('key', 'member');

      expect(response[0]).toEqual(') Added');
      expect(dictionary.dictionaryItems.length).toBe(1);
      expect(dictionary.dictionaryItems[0].key).toEqual('key');
      expect(dictionary.dictionaryItems[0].members).toEqual(['member']);
    });

    it('should add an item to existing key if key already exists', () => {
      dictionary.add('key', 'member');
      const response = dictionary.add('key', 'member2');

      expect(response[0]).toEqual(') Added');
      expect(dictionary.dictionaryItems.length).toBe(1);
      expect(dictionary.dictionaryItems[0].key).toEqual('key');
      expect(dictionary.dictionaryItems[0].members).toEqual(['member', 'member2']);
    });

    it('should return Error if member already exists', () => {
      dictionary.add('key', 'member');

      const response = dictionary.add('key', 'member');

      expect(response[0]).toEqual(') ERROR, member already exists for key');
    });
  });

  describe("getKeys", () => {
    it('should return all keys if keys exist', () => {
      dictionary.add('key', 'member');
      dictionary.add('key', 'member2');
      dictionary.add('key2', 'member');

      const response = dictionary.getKeys();
      let expectedResponses = ['key', 'key2'];

      expect(response.length).toEqual(expectedResponses.length);
      response.forEach((responseValue: string, index: number) => {
        const expectedIndex = expectedResponses.findIndex((expectedValue: string) => {
          return responseValue == `${index + 1}) ${expectedValue}`;
        });
        
        expect(expectedIndex).not.toBe(-1);
        expectedResponses.splice(expectedIndex, 1);
      });

      expect(expectedResponses.length).toBe(0);
    });

    it('should return empty text if not keys exist', () => {
      const response = dictionary.getKeys();

      expect(response[0]).toEqual('(empty set)');
    });
  });

  describe("getMembers", () => {
    it('should return all members for a given key', () => {
      dictionary.add('key', 'member');
      dictionary.add('key', 'member2');
      dictionary.add('key2', 'member');

      const response = dictionary.getMembers('key');
      let expectedResponses = ['member', 'member2'];

      expect(response.length).toEqual(expectedResponses.length);
      response.forEach((responseValue: string, index: number) => {
        const expectedIndex = expectedResponses.findIndex((expectedValue: string) => {
          return responseValue == `${index + 1}) ${expectedValue}`;
        });
        
        expect(expectedIndex).not.toBe(-1);
        expectedResponses.splice(expectedIndex, 1);
      });

      expect(expectedResponses.length).toBe(0);
    });

    it('should return an error if the key doesn\'t exist', () => {
      const response = dictionary.getMembers('key');

      expect(response[0]).toEqual(') ERROR, key does not exist');
    });
  });

  describe("removeMember", () => {
    it('should remove member if key and member exists', () => {
      dictionary.add('key', 'member');
      dictionary.add('key', 'member2');

      expect(dictionary.getMembers('key').length).toBe(2);

      const response = dictionary.removeMember('key', 'member');

      expect(response[0]).toEqual(') Removed');
      
      const getResponse = dictionary.getMembers('key');

      expect(getResponse.length).toEqual(1);
      expect(getResponse[0]).toEqual('1) member2');
    });

    it('should remove key if no more members exist', () => {
      dictionary.add('key', 'member');

      expect(dictionary.dictionaryItems.length).toBe(1);

      const response = dictionary.removeMember('key', 'member');

      expect(response[0]).toEqual(') Removed');
      
      const getResponse = dictionary.getMembers('key');

      expect(getResponse.length).toEqual(1);
      expect(getResponse[0]).toEqual(') ERROR, key does not exist');
    });

    it('should return an error if member does not exist', () => {
      dictionary.add('key', 'member');

      expect(dictionary.dictionaryItems.length).toBe(1);

      const response = dictionary.removeMember('key', 'bad member');

      expect(response[0]).toEqual(') ERROR, member does not exist');
    });

    it('should return an error if key does not exist', () => {
      const response = dictionary.removeMember('bad key', 'bad member');

      expect(response[0]).toEqual(') ERROR, key does not exist');
    });
  });

  describe("removeAllMembers", () => {
    it('should remove all members for a key', () => {
      dictionary.add('key', 'member');
      dictionary.add('key', 'member2');

      expect(dictionary.getMembers('key').length).toBe(2);

      const response = dictionary.removeAllMembers('key');

      expect(response[0]).toEqual(') Removed');
      
      const getResponse = dictionary.getMembers('key');

      expect(getResponse.length).toEqual(1);
      expect(getResponse[0]).toEqual(') ERROR, key does not exist');
    });

    it('should return error if key does not exist', () => {
      const response = dictionary.removeAllMembers('key');

      expect(response.length).toBe(1);
      expect(response[0]).toEqual(') ERROR, key does not exist');
    });
  });

  describe("clearAllKeys", () => {
    it('should remove all keys', () => {
      dictionary.add('key', 'member');
      dictionary.add('key', 'member2');

      expect(dictionary.getMembers('key').length).toBe(2);

      const response = dictionary.clearAllKeys();

      expect(response[0]).toEqual(') Cleared');

      const getResponse = dictionary.getKeys();

      expect(getResponse[0]).toEqual('(empty set)');
    });

    it('should remove all keys on an empty dictionary', () => {
      const response = dictionary.clearAllKeys();

      expect(response[0]).toEqual(') Cleared');

      const getResponse = dictionary.getKeys();

      expect(getResponse[0]).toEqual('(empty set)');
    });
  });

  describe("keyExists", () => {
    it('should return true if key exists', () => {
      dictionary.add('key', 'member');

      const response = dictionary.keyExists('key');

      expect(response[0]).toEqual(') true');
    });
    
    it('should return false if key does not exist', () => {
      const response = dictionary.keyExists('key');

      expect(response[0]).toEqual(') false');
    });
  });

  describe("memberExists", () => {
    it('should return true if key and member exist', () => {
      dictionary.add('key', 'member');

      const response = dictionary.memberExists('key', 'member');

      expect(response[0]).toEqual(') true');
    });

    it('should return false if member does not exist', () => {
      dictionary.add('key', 'member');

      const response = dictionary.memberExists('key', 'bad member');

      expect(response[0]).toEqual(') false');
    });

    it('should return false if key does not exist', () => {
      const response = dictionary.memberExists('key', 'bad member');

      expect(response[0]).toEqual(') false');
    });
  });

  describe("allMembers", () => {
    it('should return empty set if no members exist', () => {
      const response = dictionary.allMembers();

      expect(response[0]).toEqual('(empty set)');
    });

    it('should return all members if members exist', () => {
      dictionary.add('key', 'member');
      dictionary.add('key', 'member2');
      dictionary.add('key2', 'member');

      const response = dictionary.allMembers();
      let expectedResponses = ['member', 'member2', 'member'];

      expect(response.length).toEqual(expectedResponses.length);
      response.forEach((responseValue: string, index: number) => {
        const expectedIndex = expectedResponses.findIndex((expectedValue: string) => {
          return responseValue == `${index + 1}) ${expectedValue}`;
        });
        
        expect(expectedIndex).not.toBe(-1);
        expectedResponses.splice(expectedIndex, 1);
      });

      expect(expectedResponses.length).toBe(0);
    });
  });

  describe("allItems", () => {
    it('should return empty set if no members exist', () => {
      const response = dictionary.allItems();

      expect(response[0]).toEqual('(empty set)');
    });

    it('should return all members with keys if members exist', () => {
      dictionary.add('key', 'member');
      dictionary.add('key', 'member2');
      dictionary.add('key2', 'member');

      const response = dictionary.allItems();
      let expectedResponses = ['key: member', 'key: member2', 'key2: member'];

      expect(response.length).toEqual(expectedResponses.length);
      response.forEach((responseValue: string, index: number) => {
        const expectedIndex = expectedResponses.findIndex((expectedValue: string) => {
          return responseValue == `${index + 1}) ${expectedValue}`;
        });
        
        expect(expectedIndex).not.toBe(-1);
        expectedResponses.splice(expectedIndex, 1);
      });

      expect(expectedResponses.length).toBe(0);
    });
  });
});