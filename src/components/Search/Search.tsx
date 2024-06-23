import React, { useState } from "react";
import { Input, Button, Select } from "antd";

interface SearchProps {
  onSearch: (name: string, status: string | undefined) => void;
}

const { Option } = Select;

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string | undefined>(undefined);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleSearch = () => {
    onSearch(name.trim(), status);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Input
        placeholder="Search by name"
        value={name}
        onChange={handleNameChange}
        style={{ width: 200, marginRight: 16 }}
      />
      <Select
        placeholder="Select status"
        style={{ width: 120, marginRight: 16 }}
        onChange={handleStatusChange}
        allowClear
      >
        <Option value="Active">Active</Option>
        <Option value="Inactive">Inactive</Option>
      </Select>
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default Search;
