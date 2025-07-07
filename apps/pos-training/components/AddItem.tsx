"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/modal/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VStack } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";

const AddItem = () => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    available: false,
    smallVariationName: "",
    smallVariationPrice: "",
    smallVariationSKU: "",
    largeVariationName: "",
    largeVariationPrice: "",
    largeVariationSKU: "",
  });

  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      sku: form.sku,
      category: form.category,
      available: form.available,
      variations: [
        {
          name: form.smallVariationName,
          price: form.smallVariationPrice,
          sku: form.smallVariationSKU,
        },
        {
          name: form.largeVariationName,
          price: form.largeVariationPrice,
          sku: form.largeVariationSKU,
        },
      ],
    };
    try {
      const res = await fetch("/api/square/upsert-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Item added successfully!");
        setOpen(false);
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      if (err instanceof Error) {
        alert("Error: " + err.message);
      } else {
        alert("Error: " + String(err));
      }
    }
  };

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <Button icon={<Plus />} className={css({ p: "4" })}>
          Add Item
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add Item to Catalog</Modal.Title>
          <Modal.Description>
            Fill in the details to add new item.
          </Modal.Description>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <VStack gap="4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" size="md">
                <Input.Text
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Item name"
                  required
                />
              </Input>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" size="md">
                <Input.Text placeholder="Item description" />
              </Input>
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" size="md">
                <Input.Text placeholder="Stock Keeping Unit" />
              </Input>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select category</option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <input id="image" name="image" type="file" accept="image/*" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                id="available"
                name="available"
                type="checkbox"
                checked={form.available}
                onChange={handleChange}
              />
              <Label htmlFor="available">Available for Sale</Label>
            </div>
            <hr />
            <div>
              <Label>Small Variation</Label>
              <VStack gap="4">
                <Input id="smallVariationName" size="md">
                  <Input.Text
                    placeholder="Variation name (e.g. Small)"
                    defaultValue="Small"
                  />
                </Input>
                <Input id="smallVariationPrice" size="md">
                  <Input.Number placeholder="Price (cents)" />
                </Input>
                <Input id="smallVariationSKU" size="md">
                  <Input.Text placeholder="SKU (optional)" />
                </Input>
              </VStack>
            </div>
            <div>
              <Label>Large Variation</Label>
              <VStack gap="4">
                <Input id="largeVariationName" size="md">
                  <Input.Text
                    placeholder="Variation name (e.g. Large)"
                    defaultValue="Large"
                  />
                </Input>
                <Input id="largeVariationPrice" size="md">
                  <Input.Number placeholder="Price (cents)" />
                </Input>
                <Input id="largeVariationSKU" size="md">
                  <Input.Text placeholder="SKU (optional)" />
                </Input>
              </VStack>
            </div>
            <button type="submit">Save Changes</button>
          </VStack>
        </form>
        <Modal.Footer>
          <Modal.Cancel>Cancel</Modal.Cancel>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddItem;
