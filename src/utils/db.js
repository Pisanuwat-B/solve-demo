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
  onSnapshot ,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const courseRef = collection(db, 'course');

// USER -----
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
  const res = await setDoc(doc(db, 'user', authUser.uid), { ...userData });
  return res;
};

export const addUserStats = async (uid) => {
  const userData = {
    ownCourse: [],
    noti: [],
    role: 'student',
    FCMToken: '',
  };
  const res = await setDoc(doc(db, 'userStats', uid), { ...userData }, { merge: true });
  return res;
};

export const changeToTutor = async (uid) => {
  const docRef = doc(db, 'userStats', uid);
  await updateDoc(docRef, {
    role: 'tutor'
  });

  const tutorDocRef = doc(db, 'tutorToken', 'list');
  await updateDoc(docRef, {
    ids: arrayUnion(uid)
  })
};

export const addFMCToken = async (uid, token) => {
  const docRef = doc(db, 'userStats', uid);
  await updateDoc(docRef, {
    FCMToken: token
  });
};

export const addTutorToken = async (token) => {
  const docRef = doc(db, 'tutorToken', 'token');
  await updateDoc(docRef, {
    sets: arrayUnion(token)
  })
};

export const getTutorToken = async () => {
  const docRef = doc(db, 'tutorToken', 'token');
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data();
};

export const getTutorList = async () => {
  const docRef = doc(db, 'tutorToken', 'list');
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data();
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

export const getUserOwnCourse = async (id) => {
  const docRef = doc(db, 'userStats', id);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data();
};

export const addNoti = async(data) => {
  let tutorList = await getTutorList();
  console.log(tutorList);
  tutorList.ids.forEach(tutor => {
    tutor = tutor.replace(/\s/g, '');
    const docRef = doc(db, 'userStats', tutor);
    updateDoc(docRef, {
      noti: arrayUnion(data)
    })
  });
}

// QUESTION ----

export const addQuestion = async (courseID, data) => {
  const docRef = doc(db, 'question', courseID);
  await updateDoc(docRef, {
    sets: arrayUnion(data)
  })
};

export const getQuestionByID = async (id) => {
  const docRef = doc(db, 'question', id);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data();
};

// HELPER ----

export const getHelperByID = async (id) => {
  const docRef = doc(db, 'helper', id);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data();
};

// COURSE -----
export const addOwnCourse = async (uid, courseId) => {
  const docRef = doc(db, 'userStats', uid);
  await updateDoc(docRef, {
    ownCourse: arrayUnion({name: courseId, progress: 0}),
  });
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
