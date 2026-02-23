// Load environment variables first, before any other imports
import "../load-env.js";

import { clearUsers, seedUsers } from "./users.seeder.js";
import { seedAssessmentConfig } from "./settings.seeder.js";

/**
 * Seeder interface for consistent structure
 */
interface Seeder {
  name: string;
  seed: () => Promise<number | any[]>;
  clear: () => Promise<number | boolean>;
}

/**
 * Registry of all seeders
 * Add or remove seeders here to control what gets seeded/cleared
 */
const SEEDERS: Seeder[] = [
  {
    name: "users",
    seed: seedUsers,
    clear: clearUsers,
  },
];

/**
 * Additional collections to clear (that don't have seeders)
 */
const COLLECTIONS_TO_CLEAR = ["learning_progress", "assessments", "settings"];

/**
 * Seeds all data to the database
 */
const seedAll = async () => {
  console.log("🌱 Starting database seeding...\n");

  try {
    for (const seeder of SEEDERS) {
      console.log(`📝 Seeding ${seeder.name}...`);
      const result = await seeder.seed();

      if (Array.isArray(result)) {
        console.log(`✅ Successfully seeded ${result.length} ${seeder.name}.`);
        // If it's users, show details
        if (seeder.name === "users") {
          result.forEach((user: any) => {
            console.log(
              `   - ${user.firstname} ${user.lastname} (${user.documentNumber})`
            );
          });
        }
      } else {
        console.log(`✅ Successfully seeded ${result} ${seeder.name}.\n`);
      }
    }

    // Seed settings (assessment questions)
    console.log("\n📝 Seeding settings...");
    const questionCount = await seedAssessmentConfig();
    console.log(
      `✅ Successfully seeded ${questionCount} assessment questions.`
    );

    console.log("\n🎉 All seeders completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

/**
 * Clears all data from the database
 */
const clearAll = async () => {
  console.log("🧹 Starting database cleanup...\n");

  try {
    // Clear all seeded data
    for (const seeder of SEEDERS) {
      console.log(`📝 Clearing ${seeder.name}...`);
      const result = await seeder.clear();

      if (typeof result === "number") {
        console.log(`✅ Cleared ${result} ${seeder.name}.`);
      } else if (result === true) {
        console.log(`✅ Cleared ${seeder.name}.`);
      } else {
        console.log(`ℹ️  No ${seeder.name} to clear.`);
      }
    }

    // Clear additional collections
    for (const collectionName of COLLECTIONS_TO_CLEAR) {
      console.log(`\n📝 Clearing ${collectionName}...`);
      const count = await clearCollection(collectionName);
      console.log(`✅ Cleared ${count} ${collectionName} record(s).`);
    }

    console.log("\n🎉 All data cleared successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    process.exit(1);
  }
};

/**
 * Helper function to clear any collection
 */
const clearCollection = async (collectionName: string): Promise<number> => {
  const { getDocs, collection, deleteDoc, doc } = await import(
    "firebase/firestore"
  );
  const { db } = await import("../../src/lib/firebase");

  const querySnapshot = await getDocs(collection(db, collectionName));
  const deletePromises = querySnapshot.docs.map((document) =>
    deleteDoc(doc(db, collectionName, document.id))
  );

  await Promise.all(deletePromises);
  return querySnapshot.size;
};

/**
 * Resets all data (clear + seed)
 */
const resetAll = async () => {
  console.log("🔄 Starting database reset...\n");

  try {
    await clearAll();
    console.log("\n");
    await seedAll();
  } catch (error) {
    console.error("❌ Error during reset:", error);
    process.exit(1);
  }
};

// CLI execution
const command = process.argv[2];

if (command === "clear") {
  clearAll();
} else if (command === "seed") {
  seedAll();
} else if (command === "reset") {
  resetAll();
} else {
  console.error("❌ Invalid command. Use 'clear', 'seed', or 'reset'");
  console.log("Usage: pnpm db:clear, pnpm db:seed, or pnpm db:reset");
  process.exit(1);
}
