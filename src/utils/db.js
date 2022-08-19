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
  updateDoc,
  arrayUnion,
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

export const addUserStats = async (uid) => {
  const userData = {
    ownCourse: []
  };
  const res = await setDoc(doc(db, 'userStats', uid), { ...userData }, { merge: true });
  return res;
};

export const checkStatsExist = async (uid) => {
  const docRef = doc(db, 'userStats', uid);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data();
}

export const checkIfOwn = async (uid, courseId) => {
  const docRef = doc(db, 'userStats', uid);
  const querySnapshot = await getDoc(docRef);
  const ownCourse = querySnapshot.data().ownCourse;
  const checkId = obj => obj.name === courseId;
  return ownCourse.some(checkId);
};

export const addOwnCourse = async (uid, courseId) => {
  const docRef = doc(db, 'userStats', uid);
  await updateDoc(docRef, {
    ownCourse: arrayUnion({name: courseId, progress: 0}),
  });
};

export const addQuestion = async (data) => {
  console.log('add Q')
  const docRef = doc(db, 'question', data.courseID);
  await updateDoc(docRef, {
    sets: arrayUnion({data})
  })
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
  return querySnapshot.data();
};
