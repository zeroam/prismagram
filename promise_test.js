function printImmediately(print) {
  print();
}

function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}

// 동기 비동기 콜백 함수 호출
// printImmediately(() => console.log("hello"));
// printWithDelay(() => console.log("async callback"), 2000);

// Call Back Hell
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (id === "jayone" && password === "1234") {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "jayone") {
        onSuccess({ name: "jayone", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
let id = "jayonee";
let password = "1234";
// userStorage.loginUser(
//   id,
//   password,
//   (user) => {
//     console.log(`user ${user} login success`);
//     userStorage.getRoles(
//       user,
//       (userWithRole) => {
//         console.log(
//           `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
//         );
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   },
//   (error) => {
//     // console.log(error);
//     console.log("login failed");
//   }
// );

const promise = new Promise((resolve, reject) => {
  // doing some heavy work
  console.log("doing something...");
  setTimeout(() => {
    resolve("jayone");
  }, 2000);
});
// promise가 만들어지는 순간 바로 실행

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

// then에서 리턴하면 resolve(리턴값) 호출 되는 것으로 보임
fetchNumber
  .then((num) => {
    console.log(num);
    return num * 2;
  })
  .then((num) => {
    console.log(num);
    return num * 3;
  })
  .then((num) => {
    return new Promise((resolve, reject) => {
      console.log(num);
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

class UserStorage2 {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id === "jayone" && password === "1234") {
          resolve(id);
        } else {
          reject(new Error("not found"));
        }
      });
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === "jayone") {
          resolve({ name: "jayone", role: "admin" });
        } else {
          reject(new Error("no access"));
        }
      });
    });
  }
}

// login 2
const userStorage2 = new UserStorage2();
id = "jayone";
password = "1234";
userStorage2
  .loginUser(id, password)
  .then(userStorage2.getRoles)
  .then((user) =>
    console.log(`Hello ${user.name}, you have a ${user.role} role`)
  )
  .catch((error) => console.log(error));

async function delay(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

// cook
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const perc = Math.random();
      if (perc >= 0.3) {
        resolve("hen");
      } else {
        reject(new Error("error hen"));
      }
    }, 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const perc = Math.random();
      if (perc >= 0.3) {
        resolve(`${hen} => egg`);
      } else {
        reject(new Error(`error ${hen} => egg`));
      }
    }, 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const perc = Math.random();
      if (perc >= 0.3) {
        resolve(`${egg} => cook`);
      } else {
        reject(new Error(`error ${egg} => cook`));
      }
    }, 1000);
  });

getHen()
  .then(async (hen) => {
    await delay(1000);
    return `${hen} => egg`;
  })
  .then(cook)
  .then((cook) => {
    console.log(cook);
  })
  .catch((error) => {
    console.log(error);
  });

async function async_cook() {
  try {
    const hen = await getHen();
    const egg = await getEgg(hen);
    const dish = await cook(egg);
    console.log(dish);
  } catch (error) {
    console.log(error);
  }
}

// async_cook();
