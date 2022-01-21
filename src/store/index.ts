import { reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const data = reactive({ confessions: [] });

function add_confession(e: any) {
  const c_id = uuidv4();

  const options = {
    id: c_id,
    title: e.target.elements[0].value,
    text: e.target.elements[1].value,
  };

  axios
    .post("http://localhost:3000/confessions", options)
    .then((res: any) => {
      console.log(res);
    })
    .catch((error: any) => {
      console.warn(error);
    });
}
