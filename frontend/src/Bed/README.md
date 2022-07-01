# Idee

Ich dokumentier hier mal meine Grund idee, damit ich es selber nicht vergesse bzw. damit meine Mates mir vielleicht weiter helfen können.

## Beet = 2D Array
- Das Beet (engl: Bed) ist ein 2D Array mit dem Typ BedField. 
- Der Inhalt wird innerhalb einer braunen Border gerendert. 
- Die Indexe des Arrays können dann als x & y Positionen für die DB verwendet werden

## BedField
- Die Beetfelder (engl: BedField) sind genau so groß wie die Pflanzen Items in der oberenen Liste und voerst grün mit einer dünnen border gerendert
- Die BedFields haben keine margin zwischen einander (Grid)
- Die Darstellung der Felder ändert sich nach dem Bepflanzen

## Das Bepflanzen
- User kann eine Pflanze aus der Liste dragen und auf ein BedField droppen
- Das BedField übernimmt die Darstellung der platzierten Pflanze (also Value und Farbe)
- Die Platzierung wird in ein json fiel geschrieben (PlantID, PosX, PosY) 

