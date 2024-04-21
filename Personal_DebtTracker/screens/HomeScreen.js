import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import transactionList from './transaction_list';

const HomeScreen = () => {
  const [friends, setFriends] = useState([
    { id: '1', name: 'John', amountOwed: 20 },
    { id: '2', name: 'Alice', amountOwed: 10 },
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newFriendName, setNewFriendName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [borrowAmount, setBorrowAmount] = useState('');
  const [description, setDescription] = useState('');

  const addFriend = () => {
    if (newFriendName.trim() !== '') {
      const newFriend = { id: Math.random().toString(), name: newFriendName, amountOwed: 0 };
      setFriends(prevFriends => [...prevFriends, newFriend]);
      setNewFriendName('');
      setIsModalVisible(false);
    }
  };

  const deleteFriend = (friendId) => {
    setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
  };

  const handleFriendPress = (friend) => {
    setSelectedFriend(friend);
  };

  const closeDialog = () => {
    setSelectedFriend(null);
    setDescription('');
  };

  const handleBorrow = () => {
    if (borrowAmount.trim() !== '') {
      const borrowedAmount = parseFloat(borrowAmount);
      const transaction = { friend: selectedFriend.name, amount: borrowedAmount, description: description };
      transactionList.push(transaction); // Record transaction
      const updatedFriends = friends.map(friend => {
        if (friend.id === selectedFriend.id) {
          return { ...friend, amountOwed: friend.amountOwed - borrowedAmount };
        }
        return friend;
      });
      setFriends(updatedFriends);
      setBorrowAmount('');
      setDescription('');
      closeDialog();
    }
  };

  const handleLend = () => {
    if (borrowAmount.trim() !== '') {
      const lentAmount = parseFloat(borrowAmount);
      const transaction = { friend: selectedFriend.name, amount: -lentAmount, description: description }; // Add '-' sign
      transactionList.push(transaction); // Record transaction
      const updatedFriends = friends.map(friend => {
        if (friend.id === selectedFriend.id) {
          return { ...friend, amountOwed: friend.amountOwed + lentAmount };
        }
        return friend;
      });
      setFriends(updatedFriends);
      setBorrowAmount('');
      setDescription('');
      closeDialog();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends List</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFriendPress(item)}>
            <View style={styles.friendItem}>
              <View>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.amountOwed}>
                  {item.amountOwed >= 0 ? `Owes you: $${item.amountOwed.toFixed(2)}` : `You owe: $${Math.abs(item.amountOwed).toFixed(2)}`}
                </Text>
              </View>
              <MaterialIcons name="delete" size={24} color="red" onPress={() => deleteFriend(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Friend" onPress={() => setIsModalVisible(true)} />
      <Modal
        visible={!!selectedFriend}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDialog}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalAmount}>
              {selectedFriend
                ? selectedFriend.amountOwed >= 0
                  ? `${selectedFriend.name} owes you: $${selectedFriend.amountOwed.toFixed(2)}`
                  : `You owe ${selectedFriend.name}: $${Math.abs(selectedFriend.amountOwed).toFixed(2)}`
                : ''}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={borrowAmount}
              onChangeText={setBorrowAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.buttonContainer}>
              <Button title="Borrow" onPress={handleBorrow} />
              <Button title="Lend" onPress={handleLend} />
              <TouchableOpacity style={styles.closeButton} onPress={closeDialog}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter friend's name"
              value={newFriendName}
              onChangeText={setNewFriendName}
            />
            <Button title="Add" onPress={addFriend} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8EADB', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  friendName: {
    fontSize: 18,
  },
  amountOwed: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 20,
    elevation: 5,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalAmount: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
