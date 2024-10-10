import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
} from '@chakra-ui/react';

// 都道府県を選ぶコンポーネント
const PrefectureSelect = ({ value, onChange }) => {
  const prefectures = [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ];

  return (
    <FormControl id="prefecture" mb={4}>
      <FormLabel>出身</FormLabel>
      <Select
        placeholder="都道府県を選んでください"
        value={value}
        onChange={onChange}
      >
        {prefectures.map((pref, index) => (
          <option key={index} value={pref}>
            {pref}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

// 確認モーダルコンポーネント
const ConfirmationModal = ({ isOpen, onClose, submittedData, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>登録確認</ModalHeader>
        <ModalBody>
          <Box textAlign="left">
            <Box mb={4}>氏名: {submittedData.fullName}</Box>
            <Box mb={4}>性別: {submittedData.gender}</Box>
            <Box mb={4}>年齢: {submittedData.age}</Box>
            <Box mb={4}>出身: {submittedData.prefecture}</Box>
            <Box mb={4}>自己PR: {submittedData.selfIntro}</Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose} marginRight={4}>
            キャンセル
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            登録
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function App() {
  const [name, setName] = useState({ firstName: '', lastName: '' }); //.
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
