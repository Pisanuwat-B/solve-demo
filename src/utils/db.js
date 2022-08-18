import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const courseRef = collection(db, 'course');

export const addUser = async (authUser) => {
  const userData = {
    displayName: authUser.displayName,
    email: authUser.email,
    emailVerified: authUser.emailVerified,
    isAnonymous: authUser.isAnonymous,
    metadata: { ...authUser.metadata },
    phoneNumber: authUser.phoneNumber,
    photoURL: authUser.photoURL,
    uid: authUser.uid,
  };
  console.log(authUser);
  const res = await setDoc(doc(db, 'user', authUser.uid), { ...userData });
  return res;
};

export const getAllCourse = async () => {
  // const q = query(courseRef, where('level', '==', 'มัธยมศึกษาปีที่ 1'));
  const q = query(courseRef);
  const querySnapshot = await getDocs(q);
  const dataArray = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(dataArray);
};

export const getPopularCourse = async () => {
  const q = query(courseRef, orderBy('view', 'desc'), limit(4));
  const querySnapshot = await getDocs(q);
  const dataArray = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArray;
};

export const getLestPopularCourse = async () => {
  const q = query(courseRef, orderBy('view', 'asc'), limit(4));
  const querySnapshot = await getDocs(q);
  const dataArray = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArray;
};

export const getCourseList = async () => {
  const q = query(courseRef);
  const querySnapshot = await getDocs(q);
  const keylist = querySnapshot.docs.map((doc) => ({
    key: doc.id,
  }));
  console.log(keylist);
};

export const getAllCourseLevelStats = async () => {
  const q = query(courseRef);
  const querySnapshot = await getDocs(q);
  const keylist = querySnapshot.docs.map((doc) => ({
    level: doc.data().level,
  }));
  const uniqueLevel = [...new Set(keylist.map((item) => item.level))];
  let levelStats = [];
  uniqueLevel.forEach(async (level, index) => {
    const levelData = await getCoursesByLevel(level);
    levelStats[index] = {
      name: level,
      amount: levelData.length,
      exam: '2,000ข้อ',
    };
  });
  console.log(levelStats);
};

export const getCoursesByLevel = async (level) => {
  const q = query(courseRef, where('level', '==', level));
  const querySnapshot = await getDocs(q);
  const dataArray = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArray;
};

export const getCoursesByID = async (id) => {
  const docRef = doc(db, 'course', id);
  const querySnapshot = await getDoc(docRef);
  console.log(querySnapshot.data());
  return querySnapshot.data();
};
