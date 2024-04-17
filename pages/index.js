import {
  TextInput,
  Textarea,
  Button,
  Container,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

export default function Home() {
  const submitForm = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: (values) => {
      const errors = {};
      if (!/^\S+@\S+$/.test(values.email)) {
        errors.email = "Invalid email";
      }
      return errors;
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // showNotification here
  };

  return (
    <Container size={200} px={0} mt="xl">
      <Box mt="xl">
        <form onSubmit={console.log("values")}>
          <TextInput
            requireed
            label="Email"
            placeholder="Enter your email"
            {...submitForm.getInputProps("email")}
          />
          <TextInput
            required
            label="Name"
            placeholder="Enter your name"
            {...submitForm.getInputProps("name")}
          />
          <Textarea
            required
            label="Message"
            placeholder="Enter your message"
            {...submitForm.getInputProps("message")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="blue">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}
