import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  Stack,
  Flex,
} from '@chakra-ui/react';
import PrefectureSelect from './PrefectureSelect'; // 都道府県選択コンポーネント
import ConfirmationModal from './ConfirmationModal'; // 確認モーダル

function App() {
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(1);
  const [prefecture, setPrefecture] = useState('');
  const [selfIntro, setSelfIntro] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});

  const handleSubmit = () => {
    setSubmittedData({
      fullName: `${name.lastName} ${name.firstName}`,
      gender,
      age,
      prefecture,
      selfIntro,
    });
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    console.log('登録されました:', submittedData);
    handleClose();
  };

  return (
    <ChakraProvider>
      <Box
        p={8}
        maxWidth="600px"
        margin="0 auto"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        mt={16}
      >
        {/* 名前 */}
        <FormControl id="name" mb={4}>
          <FormLabel>名前</FormLabel>
          <Input
            placeholder="苗字"
            value={name.lastName}
            onChange={e => setName({ ...name, lastName: e.target.value })}
            mb={2}
          />
          <Input
            placeholder="名前"
            value={name.firstName}
            onChange={e => setName({ ...name, firstName: e.target.value })}
          />
        </FormControl>

        {/* 性別 */}
        <FormControl id="gender" mb={4}>
          <FormLabel>性別</FormLabel>
          <RadioGroup onChange={setGender} value={gender}>
            <Stack direction="row">
              <Radio value="男性">男性</Radio>
              <Radio value="女性">女性</Radio>
              <Radio value="その他">その他</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* 年齢 */}
        <FormControl id="age" mb={4}>
          <FormLabel>年齢</FormLabel>
          <NumberInput
            value={age}
            onChange={value => setAge(parseInt(value))}
            min={0}
            max={120}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        {/* 出身 */}
        <PrefectureSelect
          value={prefecture}
          onChange={e => setPrefecture(e.target.value)}
        />

        {/* 自己PR */}
        <FormControl id="self-intro" mb={4}>
          <FormLabel>自己PR</FormLabel>
          <Textarea
            placeholder="自己PRを入力してください"
            value={selfIntro}
            onChange={e => setSelfIntro(e.target.value)}
          />
        </FormControl>

        {/* 登録ボタン */}
        <Flex justifyContent="flex-end" mt={4}>
          <Button colorScheme="green" onClick={handleSubmit}>
            登録
          </Button>
        </Flex>
      </Box>

      {/* モーダル */}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        submittedData={submittedData}
        onConfirm={handleConfirm}
      />
    </ChakraProvider>
  );
}

export default App;
