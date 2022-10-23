import { useState, useEffect } from 'react';
import Head from 'next/head';
import NotiBadge from '../components/Notification/NotiBadge';

import { db } from '../src/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import { useAuth } from '../src/lib/auth-service';

const NotificationPage = () => {
  const [noti, setNoti] = useState();
  const { user, role } = useAuth();

  useEffect(() => {
    if (role === 'tutor') {
      const fetchTutorNotiData = async () => {
        const snap = onSnapshot(
          doc(db, 'userStats', 'FGAvYwb1qzXxCO2nQE1AEHWVApA3'),
          (doc) => {
            console.log(doc.data().noti);
            setNoti(doc.data().noti);
          }
        );
      };
      fetchTutorNotiData();
    } else if (role === 'student' && user) {
      const fetchStudentNotiData = async () => {
        const snap = onSnapshot(
          doc(db, 'userStats', user.uid),
          (doc) => {
            console.log(doc.data().noti);
            setNoti(doc.data().noti);
          }
        );
      };
      fetchStudentNotiData();
    }
  }, [role, user]);

  return (
    <>
      <Head>
        <title>SOLVE - Practicing makde easy</title>
        <meta
          name="description"
          content="SOLVE support your practicing journey"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/bacon.svg" />
      </Head>
      <main>
        {noti ? (
          <div className="noti-box">
            {noti.map((notiData, index) => (
              <NotiBadge {...notiData} role={role} key={index} />
            ))}
          </div>
        ) : (
          <div className="blank-box">
            <div>There is nothing here at the moment</div>
          </div>
        )}
      </main>
    </>
  );
};

export default NotificationPage;
