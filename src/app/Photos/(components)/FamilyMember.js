"use client";
import { useState } from "react";
import SearchableSelect from "@/components/smallComponents/SearchableSelect";
import InsertImages from "../(components)/InsertImages";
import FamilyArt from "../(components)/FamilyArt";
export default function FamilyMember({ familyMembers }) {
  const [selected, setSelected] = useState({
    value: null,
    label: "Selecciona",
  });
  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4 items-end justify-between">
        <div>
          <label>De quien es el trabajo</label>
          <SearchableSelect
            options={familyMembers}
            value={selected}
            onChange={(e) => setSelected(e)}
          />
        </div>
        {selected.value && <InsertImages userId={selected} />}
      </div>
      {selected.value && <FamilyArt user={selected} />}
    </div>
  );
}
