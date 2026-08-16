import {test}               from "../util/test.js";
import {RelationController} from "./relationController.js";

test("relationController: relationsById")( assert => {
   const relationController = RelationController();
   let result;
   result = relationController.relationsById([], "", "");
   assert.is(result.length, 0, "empty table");

   const relationTable = [{id:"", oneSideId:"1", manySideId:"2" }];
   result = relationController.relationsById(relationTable, "oneSideId", "1");
   assert.is(result.length, 1, "find one side");
   result = relationController.relationsById(relationTable, "manySideId", "2");
   assert.is(result.length, 1, "find many side");

   result = relationController.relationIndexByPair(relationTable, "oneSideId","1","manySideId","no-such-id");
   assert.is(result, -1, "when pair not found" );
   result = relationController.relationIndexByPair(relationTable, "oneSideId","1","manySideId","2");
   assert.is(result, 0, "pair found at first index" );

   relationController.removeAllById(relationTable, "oneSideId", "no-such-id");
   assert.is(relationTable.length, 1, "no removal when id not found");
   relationController.removeAllById(relationTable, "oneSideId", "1");
   assert.is(relationTable.length, 0, "removal when id found");

});
